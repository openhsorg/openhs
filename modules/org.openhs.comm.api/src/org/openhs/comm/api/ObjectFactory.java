package org.openhs.comm.api;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.Map;

public class ObjectFactory<R> {
	private Map<String, Class<?>> m_creators;

	public ObjectFactory() {
		m_creators = new HashMap<String, Class<?>>();
	}

	public <S> void registerClass(String id, Class<S> klass) {
		if (m_creators.get(id) != null) {
			// TODO error handling
		}
		m_creators.put(id, klass);
	}

	public boolean hasClass(String id) {
		return m_creators.get(id) != null;
	}

	public Object createObject(String id, R representation) {
		Class<?> klass = m_creators.get(id);
		Object retval = null;
		if (klass == null) {
			return retval;
		}
		// calls the required createObject() function
		try {
			retval = klass.getConstructor(representation.getClass()).newInstance(representation);
		} catch (InstantiationException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (NoSuchMethodException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return retval;
	}

}
